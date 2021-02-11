# usPlDevAzure
## Struktura projektu
Obecne repozytorium [usPlDevAzure](https://github.com/andairka/usPlDevAzure), w znim znajduje się:
- katalog [server] znajduje się aplikacja serwerowa. Serwer aplikacjyny napisany w node.js oraz w frameworku Nest.js. Aplikacja przetwarza żądania przesłane z aplikacji webowej i korzystjąc z bazy danych zapisuje i pobiera dane.
- katalog [webapp] znajduje się aplikacje webowa napisana z wykorzystaniem Node.js i frameowrka Angular. Aplikacja odpowiedzialna jest za interakcje z użytkownikiem oraz za przesyłanie danych do części serwerowej.
- skrypt [setup.sh] zawierający polecenia do wdrożenia aplikacji na portalu Azure

## Instrukcja
aby dokonać wdrożenia aplikacji nazleży pobrąć repozytorium (jest ono publicznie dostępne) i uruchomić skrypt [setup.sh], poleceniem `sh setup.sh`

na ekranie w kolejnych krokach dokonywana będzie konfiguracja i publikacja aplikacji.

dodatkowo każdy krok opatrzony jest komentarzem, który będzie wyświetlany w konsoli terminala.


UWAGA: nalezy pamiętać by usunąć nie używane zasoby

### DELETE
- usuwanie resource group
`az group delete --name usPlDevAzure-group`
