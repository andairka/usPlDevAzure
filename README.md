# usPlDevAzure
## Struktura projektu
Obecne repozytorium [usPlDevAzure](https://github.com/andairka/usPlDevAzure) jest repozytorium gównym. To w nim znajduje sie instrukcja, jak skonfigurować środowisko AZURE w ramach projektu. W pliku README.md.
Projekt zawiera również plik konfigarcyjny bazy danych - plik docker-compose.
W repozytorium [usPlDevAzure-server](https://github.com/andairka/usPlDevAzure-server) znajduje się aplikacja serwerowa. Serwer aplikacjyny napisany w node.js oraz w frameworku Nest.js. Aplikacja przetwarza żądania przesłane z aplikacji webowej i korzystjąc z bazy danych zapisuje i pobiera dane.
w repozytorium [usPlDevAzure-webapp](https://github.com/andairka/usPlDevAzure-webapp) znajduje się aplikacje webowa napisana z wykorzystaniem Node.js i frameowrka Angular. Aplikacja odpowiedzialna jest za interakcje z użytkownikiem oraz za przesyłanie danych do części serwerowej.

## Instrukcja
`az login` logowanie do Azure Portal
