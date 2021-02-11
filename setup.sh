#!/usr/bin/env sh



## Login into Azure account
echo "Logowanie do konta Azure"
az login

echo "Utworzenie grupy zasobów."
az group create --location westeurope --name usPlDevAzure-group

echo "Tworzenie bazy danych postgress"

echo "Utwórz serwer Azure Database for PostgreSQL"
az postgres server create --resource-group usPlDevAzure-group --name usPlDevAzure-serverdb  --location westeurope --admin-user myadmin --admin-password Az123456789 --sku-name GP_Gen5_2

echo "Dodaj zasade logowania - pozwolenie na adresy ip przychodzace"
az postgres server firewall-rule create -g usPlDevAzure-group -s usPlDevAzure-serverdb -n allowip --start-ip-address 0.0.0.0 --end-ip-address 255.255.255.255

echo "Stworzenie PostgreSQL bazy danych"
az postgres db create --resource-group usPlDevAzure-group --server-name usPlDevAzure-serverdb --name uspldevazurdb


echo "Utworzenie Usługi ACR - Azure Containers Registry"
az acr create --resource-group usPlDevAzure-group --name usPlDevAzurcr --sku Basic --admin-enabled true

echo "Logowanie do ACR"
az acr login --name uspldevazurcr

echo "SERVER"
cd server
echo "Zbudowanie obrazu servera"
docker build . -t uspldevazure-serverdc

echo "Otagowanie servera"
docker tag uspldevazure-serverdc:latest uspldevazurcr.azurecr.io/uspldevazure-serverdc

echo "Wypchniecie obrazu servera"
docker push uspldevazurcr.azurecr.io/uspldevazure-serverdc

echo "Pobranie username acr"
acrUsername=$(az acr credential show -n uspldevazurcr --query username | sed -e 's/"//g')
echo "Username: ${acrUsername}"
echo "Pobranie password acr"
acrPassword=$(az acr credential show -n uspldevazurcr --query passwords[0].value | sed -e 's/"//g')
echo "Password: ${acrPassword}"

echo "Utworzenie servisu - server"
az container create \
--name uspldevazure-serverdc \
--resource-group usPlDevAzure-group \
--cpu 1 \
--memory 1 \
--dns-name-label uspldevazure-serverdc \
--ports 3000 \
--image uspldevazurcr.azurecr.io/uspldevazure-serverdc \
--registry-login-server uspldevazurcr.azurecr.io \
--registry-username "${acrUsername}" \
--registry-password "${acrPassword}"


cd ..
ls


echo "WEBAPP"
cd webapp
echo "Zbudowanie obrazu webapp"
docker build . -t uspldevazure-webappdc

echo "Otagowanie webapp"
docker tag uspldevazure-webappdc:latest uspldevazurcr.azurecr.io/uspldevazure-webappdc

echo "Wypchniecie obrazu webapp"
docker push uspldevazurcr.azurecr.io/uspldevazure-webappdc

echo "Pobranie username acr"
acrUsername=$(az acr credential show -n uspldevazurcr --query username | sed -e 's/"//g')
echo "Username: ${acrUsername}"
echo "Pobranie password acr"
acrPassword=$(az acr credential show -n uspldevazurcr --query passwords[0].value | sed -e 's/"//g')
echo "Password: ${acrPassword}"

echo "Utworzenie servisu - webapp"
az container create \
--name uspldevazure-webappdc \
--resource-group usPlDevAzure-group \
--cpu 1 \
--memory 1 \
--dns-name-label uspldevazure-webappdc \
--ports 4200 \
--image uspldevazurcr.azurecr.io/uspldevazure-webappdc \
--registry-login-server uspldevazurcr.azurecr.io \
--registry-username "${acrUsername}" \
--registry-password "${acrPassword}"


cd ..
ls

echo "Adres applikacji: http://uspldevazure-webappdc.westeurope.azurecontainer.io:4200/"
echo "KONIEC"
