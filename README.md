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
`az acr create --resource-group usPlDevAzure-group --name usPlDevAzurcr --sku Basic`

- nalezy zanotować wartość `loginServer`, prawdopodobie `usPlDevAzurcr.azurecr.io`

- logowanie do rejestru kontenerów
`az acr login --name usPlDevAzurcr`
  
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
