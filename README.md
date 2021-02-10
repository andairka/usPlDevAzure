# usPlDevAzure
## Struktura projektu
- Obecne repozytorium [usPlDevAzure](https://github.com/andairka/usPlDevAzure) jest repozytorium gównym. To w nim znajduje sie instrukcja, jak skonfigurować środowisko AZURE w ramach projektu. W pliku README.md.
Projekt zawiera również plik konfigarcyjny bazy danych - plik docker-compose.
- W repozytorium [usPlDevAzure-server](https://github.com/andairka/usPlDevAzure-server) znajduje się aplikacja serwerowa. Serwer aplikacjyny napisany w node.js oraz w frameworku Nest.js. Aplikacja przetwarza żądania przesłane z aplikacji webowej i korzystjąc z bazy danych zapisuje i pobiera dane.
- W repozytorium [usPlDevAzure-webapp](https://github.com/andairka/usPlDevAzure-webapp) znajduje się aplikacje webowa napisana z wykorzystaniem Node.js i frameowrka Angular. Aplikacja odpowiedzialna jest za interakcje z użytkownikiem oraz za przesyłanie danych do części serwerowej.

## Instrukcja
`az login` logowanie do Azure Portal

### RESOURCE GROUP

- stworzenie resource group
`az group create --location westeurope --name usPlDevAzure-group`

### POSTGRES
- stworzenie usługi ACR
`az acr create --resource-group usPlDevAzure-group --name usPlDevAzurcr --sku Basic` --admin-enabled true

- nalezy zanotować wartość `loginServer`, u mnie "loginServer": `uspldevazurcr.azurecr.io`

Proszę się upewnić, ze Docker jest zainstalowany na maszynie, z której się łączymy.

- logowanie do rejestru kontenerów
`az acr login --name uspldevazurcr`

#### Server part
docker build . -t uspldevazure-serverdc  
docker tag uspldevazure-serverdc:latest uspldevazurcr.azurecr.io/uspldevazure-serverdc

docker push uspldevazurcr.azurecr.io/uspldevazure-serverdc


docker run --rm -it -p 3000:3000/tcp uspldevazure-serverdc:latest


az container create \
--name uspldevazure-serverdc \
--resource-group usPlDevAzure-group \
--cpu 1 \
--memory 1 \
--dns-name-label uspldevazure-serverdc \
--ports 80 \
--image uspldevazurcr.azurecr.io/uspldevazure-serverdc:lastest \
--registry-login-server uspldevazurcr.azurecr.io \
--registry-username "${ContainerRegistryUsername}" \
--registry-password "${ContainerRegistryPassword}"

docker run -it --rm -p 3000:3000/tcp uspldevazurcr.azurecr.io/uspldevazure-serverdc


- sciagniecie repozytorium na loklana maszyne
`git clone https://github.com/andairka/usPlDevAzure`

- Puschujemy obrazy do acr
`docker-compose -f us-pi-dev-azure-dc-11.yml push`
  
### BAZA DANYCH POSTGRES
- Utwórz serwer Azure Database for PostgreSQL
`az postgres server create --resource-group usPlDevAzure-group --name usPlDevAzure-serverdb  --location westeurope --admin-user myadmin --admin-password Az123456789 --sku-name GP_Gen5_2`

zanotuj `"administratorLogin": "myadmin"` oraz`"fullyQualifiedDomainName": "uspldevazure-serverdb.postgres.database.azure.com"`
- Dodaj zasade logowania - pozwolenie na adresy ip przychodzace
`az postgres server firewall-rule create -g usPlDevAzure-group -s usPlDevAzure-serverdb -n allowip --start-ip-address 0.0.0.0 --end-ip-address 255.255.255.255`
- stworzenie PostgreSQL bazy danych
`az postgres db create --resource-group usPlDevAzure-group --server-name usPlDevAzure-serverdb --name uspldevazurdb`
  
### WEBAPP
- dane
`gitrepo=https://github.com/andairka/usPlDevAzure-webapp`
`webappname=usPlDevAzure-webapp`

- stworzenie App Service plan w darmowym poziomie.
`az appservice plan create --name usPlDevAzure-webapp --resource-group usPlDevAzure-group --sku FREE`

- stworzenie a web app.
`az webapp create --name usPlDevAzure-webapp --resource-group usPlDevAzure-group --plan usPlDevAzure-webapp`

- umieścić kod z publicznego repozytorium GitHub 
`az webapp deployment source config --name usPlDevAzure-webapp --resource-group usPlDevAzure-group --repo-url https://github.com/andairka/usPlDevAzure-webapp --branch main --manual-integration`

- aby wyświetlić aplikację webową, skopiuj wynik następującego polecenia do przeglądarki (można pominąc ten krok)
`echo http://usPlDevAzure-webapp.azurewebsites.net`

### SERVER
- dane
`gitrepo=https://github.com/andairka/usPlDevAzure-server`
`webappname=usPlDevAzure-server`

- stworzenie App Service plan w darmowym poziomie.
`az appservice plan create --name usPlDevAzure-server --resource-group usPlDevAzure-group --sku FREE`

- stworzenie a web app.
`az webapp create --name usPlDevAzure-server --resource-group usPlDevAzure-group --plan usPlDevAzure-server`

- umieścić kod z publicznego repozytorium GitHub 
`az webapp deployment source config --name usPlDevAzure-server --resource-group usPlDevAzure-group --repo-url https://github.com/andairka/usPlDevAzure-server --branch main --manual-integration`

- aby wyświetlić aplikację webową, skopiuj wynik następującego polecenia do przeglądarki (można pominąc ten krok)
`echo http://usPlDevAzure-server.azurewebsites.net`

### DELETE
- usuwanie resource group
`az group delete --name usPlDevAzure-group`
