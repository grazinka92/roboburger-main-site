# RoboBurger — wierna kopia strony (zejście z WordPressa)

**Data:** 2026-07-10
**Autor:** GG (Sweet Robo) + Claude Code
**Status:** projekt zatwierdzony do dalszej rozpiski

> Słowniczek pojęć technicznych znajduje się na końcu dokumentu.

---

## 1. Cel

Odtworzyć obecną stronę **roboburger.com** jako nowoczesną **stronę statyczną** — wiernie 1:1 pod względem wyglądu i treści — i zejść z WordPressa. Powody: większa szybkość, większe bezpieczeństwo (brak bazy danych do zaatakowania), niższe koszty i brak konieczności aktualizowania wtyczek.

Redesign **nie** wchodzi teraz w zakres. Ewentualne zmiany wyglądu można wprowadzać później, mając już stronę „u siebie".

## 2. Zakres

### Podstrony do odtworzenia (1:1)
- Home
- Product
- About Us
- Invest
- Contact Us
- Strony prawne: Terms & Services, Privacy Policy, Cookies Policy

### Elementy wspólne
- **Menu (nagłówek)** z linkami do podstron. Pozycja „Sweet Robo" prowadzi do zewnętrznej strony `sweetrobo.com` — jej **nie** przebudowujemy, tylko podlinkowujemy.
- **Stopka**: linki do podstron, ikony social (Instagram, Facebook, LinkedIn, YouTube), dane kontaktowe (e-mail `Sales@RoboBurger.com`, telefon `1 (866) 805-3330`).

### Poza zakresem
- Przebudowa strony Sweet Robo (`sweetrobo.com`).
- Redesign / zmiana układu.
- Panel administracyjny (CMS) — patrz punkt „Edycja treści".

## 3. Fundament techniczny

- **Astro** — generator, który z plików źródłowych buduje gotową stronę statyczną (bardzo szybką i bezpieczną).
- Wspólne elementy (menu, stopka) trzymane w **jednym miejscu** — poprawka w jednym pliku zmienia stronę wszędzie.
- **Responsywność** (poprawny wygląd na telefonie i komputerze) odtworzona zgodnie z oryginałem.
- Narzędzia potrzebne do pracy są już zainstalowane na komputerze GG: **Node.js v24, npm 11, git 2.55** — brak dodatkowej instalacji.

## 4. Źródło materiałów

- **Odtworzenie z żywej, publicznej strony** roboburger.com (wygląd, teksty, zdjęcia są publicznie dostępne).
- **Od GG:**
  - Logo w wektorze (.ai / .svg / .eps) — dla ostrości na każdym ekranie. *(dostępne)*
  - Czcionki: **takie same jak obecnie na stronie**. W trakcie budowy zostaną wykryte dokładne nazwy i sposób ładowania, następnie potwierdzone z GG.
  - *(Opcjonalnie)* oryginały zdjęć w wyższej jakości, jeśli są pod ręką.

## 5. Edycja treści po uruchomieniu

Zmiany (poprawki tekstu, wymiana zdjęcia, zmiana ceny w kampanii) będą wprowadzane **z pomocą Claude Code / programisty** — bez panelu administracyjnego (CMS). Najprostsze i najszybsze do uruchomienia. Panel można dołożyć w przyszłości, gdyby zaszła potrzeba.

## 6. Elementy interaktywne

- **Formularz kontaktowy** — obsłużony bez własnego serwera. Ponieważ hosting to **Cloudflare Pages**, formularz obsłuży lekka usługa (np. *Web3Forms* lub *Formspree*, darmowe plany) albo mała funkcja Cloudflare Pages. Zgłoszenia trafiają na wskazany adres e-mail. Konkretną usługę wybierzemy przy budowie formularza.
- **Calendly** (umawianie spotkań) — osadzone dokładnie jak obecnie.
- Przyciski typu „Contact Us To Reserve" — działanie jak obecnie.
- **Baner cookies + analityka** — jeśli obecna strona je posiada, zostaną odtworzone zgodnie z oryginałem.

## 7. Hosting i publikacja

- **Repozytorium** (folder projektu w chmurze z historią zmian) na **firmowym GitHubie**. GG ma uprawnienia, by utworzyć je samodzielnie.
- **Host** podpięty do repozytorium tak, że każda zmiana **publikuje się automatycznie** („deploy").
- **Wybór hostingu: Cloudflare Pages** (decyzja podjęta). Uzasadnienie z badania DNS:
  - `sweetrobo.com` korzysta z **Cloudflare** → firma ma konto Cloudflare.
  - `roboburger.com` stoi obecnie na **SiteGround** (WordPress).
  - Cloudflare Pages jest darmowy i spójny z tym, czego firma już używa; docelowo domenę `roboburger.com` przeniesiemy pod Cloudflare.
  - Do ustalenia po stronie firmy: **kto ma dostęp do konta Cloudflare** (potrzebne, by podłączyć repozytorium i później przełączyć domenę).
- **Kolejność uruchomienia:**
  1. Najpierw **tymczasowy adres testowy** (`nazwa.pages.dev` — darmowy adres od Cloudflare Pages) do obejrzenia i porównania.
  2. Dopiero po akceptacji — **przełączenie domeny `roboburger.com`** na nową stronę (zmiana ustawień DNS).
  3. **Stary WordPress na SiteGround zostaje nietknięty** aż do momentu przełączenia — zero ryzyka, łatwy powrót.

## 8. Weryfikacja (jak sprawdzimy, że jest wiernie)

- Porównanie **obok siebie** (obecna vs nowa) podstrona po podstronie: wygląd, teksty, linki.
- Test na **telefonie i komputerze**.
- Sprawdzenie, czy **formularz** dochodzi na e-mail i czy **Calendly** działa.
- Sprawdzenie wszystkich linków (wewnętrznych i zewnętrznych, w tym social).

## 9. Kolejność prac

1. Utworzenie projektu Astro + repozytorium na GitHubie.
2. Elementy wspólne: menu, stopka, kolory, czcionki, style.
3. Podstrony po kolei: Home → Product → About Us → Invest → Contact Us → strony prawne.
4. Formularz + Calendly + cookies/analityka.
5. Publikacja na adresie testowym → porównanie → poprawki.
6. Potwierdzenie hostingu i przełączenie domeny.

## 10. Otwarte kwestie do potwierdzenia

- **Dostęp do konta Cloudflare** — ustalić, kto w firmie nim zarządza (potrzebne do podłączenia repozytorium i przełączenia domeny). Nie blokuje budowy strony.
- **Usługa formularza** — wybór lekkiej usługi dla Cloudflare Pages (np. Web3Forms / Formspree / funkcja Pages) na etapie budowy formularza.
- **Czcionki** — potwierdzić nazwy i licencje po wykryciu na obecnej stronie.

---

## Słowniczek

- **Strona statyczna** — strona z gotowych plików, które ładują się od razu; nie składa jej za każdym razem serwer z bazy danych (jak robi WordPress).
- **Astro** — narzędzie („generator stron"), które z plików źródłowych tworzy gotową stronę statyczną.
- **Repozytorium (repo)** — folder projektu w chmurze (np. na GitHubie) z pełną historią zmian.
- **GitHub** — serwis do przechowywania kodu (jak Dysk Google, ale dla plików projektu).
- **Host / hosting** — miejsce w internecie, z którego udostępniana jest strona.
- **Deploy (publikacja)** — wysłanie zmian tak, że stają się widoczne w internecie.
- **DNS / serwery nazw** — internetowa „książka adresowa", która mówi, gdzie stoi strona danej domeny.
- **CMS (panel administracyjny)** — system do samodzielnej edycji treści strony bez dotykania kodu (np. WordPress). W tym projekcie świadomie z niego rezygnujemy.
- **Responsywność** — poprawne dopasowanie wyglądu do ekranu telefonu, tabletu i komputera.
