# <span>🇵🇱</span>

<br>

## Projekt dodatkowy - Pracownia specjalizująca 2020

<br>
<hr>

## 📜 O projekcie:

### <b>Idea projektu</b>:

Projekt ma za zadanie monitorowanie zużycia zasobów Raspberry Pi 4B, wysyłanie logów poprzez WebSocket do bazy danych, gdzie będą przechowywane przez okres 7 dni.

Pozwoli to po przejściu autoryzacji poprzez zarejestrowanego użytkownika na diagnostykę systemu poprzez interfejs aplikacji webowej, pokazującej zapisy z ostatniego tygodnia.

Nowe zapisy tworzone są co 20 sekund oraz w czasie rzeczywistym, dzięki użyciu WebSocket-ów, wysyłane odrazu do klienta.

<br>

### <b>Projekt podzielony jest na 4 części:</b>

- Front-end - aplikację webową działającą po stronie klienta, interfejs aplikacji
- Back-end - oprogramowanie działające na serwerze
- Pi - oprogramowanie działające na moim Raspberry Pi w sieci lokalnej
- Baza danych - MongoDB działające w chmurze

<br>
<hr>

## 🛠️ Technologie oraz struktura plików:

Całość aplikacji napisana została w języku JavaScript, z użyciem HTML i CSS po stronie klienta.
<br>

### <b>Front-End</b>

Aplikacja webowa - interfejs użytkownika

<details>
  <summary>🖥️ <em>UI</em>: <a href="https://reactjs.org/"><b>React</b></a></summary><br>

<em> - biblioteka JavaScript służąca do tworzenia interfejsu użytkownika.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Połączenie z serwerem</em>: <a href="https://www.axios.com/"><b>Axios</b></a>, <a href="https://www.socket.io/"><b>Socket.io-client</b></a> </summary><br>
<em>  
    <b>Axios</b> - biblioteka umożliwiające proste wysyłanie zapytań HTTP (RESTful)<br>
    <b>Socket.io-client</b> - biblioteka umożliwiająca nawiązanie połączenia z serwerem z wykorzystaniem WebSocket (full-duplex w czasie rzeczywistym)  
</em>
<br>

</details>

<details>
  <summary>🖥️ <em>Wykresy/Wizualizacja danych</em>: <a href="https://www.chartjs.org/"><b>ChartJS</b></a></summary><br>

<em> - biblioteka JavaScript umożliwiająca wydajną wizualizacje danych.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Autoryzacja po stronie klienta</em>: <a href="https://www.jwt.io/"><b>JWT</b></a></summary><br>

<em> - Token pozwalający na uwierzytelnianie.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Routing</em>: <a href="https://reactrouter.com/"><b>React Router</b></a></summary><br>

<em> - Routing dla ReactJS.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Walidacja danych</em>: <a href="https://joi.dev/"><b>Joi</b></a></summary><br>

<em>
    - biblioteka umożliwająca sprawdzenie danych według zdefinowanego modelu
</em>
<br>
</details>
<br>

### <b>Back-End</b>

Oprogramowanie serwera

<details>
  <summary>🖥️ <em>Platforma</em>: <a href="https://nodejs.org/"><b>Node.js</b></a></summary><br>

<em> - natywne środowisko JavaScript.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Framework</em>: <a href="https://expressjs.org/"><b>Express</b></a>, <a href="https://socket.io/"><b>Socket.io</b></a></summary><br>

<em>
    <b>Express</b>- framework do tworzenia aplikacji RESTful.<br>
    <b>Socket.io</b>- biblioteka umożliwiająca utworzenie połączenia WebSocket.
</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Baza danych</em>: <a href="https://mongodb.com/"><b>MongoDB</b></a></summary><br>

<em> - baza danych oparta na dokumentach JSON-like.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>API bazy danych</em>: <a href="https://mongoose.com/"><b>Mongoose</b></a></summary><br>

<em> - biblioteka bazująca na natywnym API MongoDB.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Autoryzacja/Uwierzytelnianie</em>: <a href="https://jwt.io/"><b>JWT</b></a>, <a href="https://jwt.io/"><b>bcrypt</b></a></summary><br>

<em> <b>JWT</b> - Token uwierzytelniający.</em><br>
<em> <b>bcrypt</b> - Szyfrowanie danych</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Walidacja danych</em>: <a href="https://joi.dev/"><b>Joi</b></a></summary><br>

<em>
    - biblioteka umożliwająca sprawdzenie danych według zdefinowanego modelu
</em>
<br>
</details>

<br>

### <b>Pi</b>

Oprogramowanie działające na Raspberry Pi

<details>
  <summary>🖥️ <em>Platforma</em>: <a href="https://nodejs.org/"><b>Node.js</b></a></summary><br>

<em> - natywne środowisko JavaScript.</em>
<br>

</details>
<details>
  <summary>🖥️ <em>Framework</em>: <a href="https://expressjs.org/"><b>Express</b></a>, <a href="https://socket.io/"><b>Socket.io-client</b></a></summary><br>

<em>
    <b>Express</b>- framework do tworzenia aplikacji RESTful.<br>
    <b>Socket.io-client</b> - biblioteka umożliwiająca nawiązanie połączenia z serwerem z wykorzystaniem WebSocket (full-duplex w czasie rzeczywistym)  
</em>
<br>
</details>
<details>
  <summary>🖥️ <em>Pobieranie danych</em>: <a href="https://systeminformation.com/"><b>Systeminformation</b></a></summary><br>

<em>
    - moduł Node.js pozwalający na zebranie danych o systemie 
</em>
<br>
</details>
<details>
  <summary>🖥️ <em>Walidacja danych</em>: <a href="https://joi.dev/"><b>Joi</b></a></summary><br>

<em>
    - biblioteka umożliwająca sprawdzenie danych według zdefinowanego modelu
</em>
<br>
</details>
<details>
  <summary>🖥️ <em>Scheduler</em>: <a href="https://www.npmjs.com/package/node-cron"><b>node-cron</b></a></summary><br>

<em>
    - biblioteka dodająca funkcjonalność opratą na UNIX'owym cron
</em>
<br>
</details>
