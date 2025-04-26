# Express Authentication & CRUD App

Цей проект демонструє реалізацію повноцінного бекенду на базі Express.js із підтримкою:

- Аутентифікації через JWT
- Повного CRUD API для роботи з MongoDB
- Управління кукісами та темами
- Статичних файлів і шаблонізації через PUG
- Захищених маршрутів

## Основні можливості

- Реєстрація та вхід користувачів із JWT
- CRUD-операції для управління користувачами
- Захищені маршрути
- Перемикання теми (світла/темна) зі збереженням у cookie
- Підключення favicon
- Адаптивний дизайн

## Передумови

- Node.js (14+ версія)
- npm (6+ версія)

## Встановлення

1. Клонувати репозиторій:
```bash
git clone <your-repository-url>
cd express-auth-project
```

2. Встановити залежності:
```bash
npm install
```

3. Створити `.env` файл:
```
PORT=3000
SESSION_SECRET=your-super-secret-key
DB_PASS=your-database-password
DB_NAME=your-database-name
DB_URL=mongodb+srv://<db_username>:<db_password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

4. Додати `favicon.ico` у папку `public`.

5. Додаткові скрипти:
   - Додавання користувача через скрипт:
   ```bash
   node addUser.js <name> <email> <age>
   ```

## Запуск додатку

Режим розробки:
```bash
npm run dev
```

Продакшн режим:
```bash
npm start
```

Додаток буде доступний на `http://localhost:3000`

## Доступні маршрути

### Аутентифікація та загальні сторінки

| Метод | Маршрут | Опис |
|:-----|:-------|:-----|
| `GET` | `/` | Головна сторінка |
| `GET` | `/login` | Сторінка входу |
| `POST` | `/login` | Надсилання даних входу |
| `GET` | `/register` | Сторінка реєстрації |
| `POST` | `/register` | Надсилання даних реєстрації |
| `POST` | `/theme` | Перемикання теми |
| `GET` | `/dashboard` | Панель керування (захищений маршрут) |
| `GET` | `/views` | Сторінка з шаблонізатором EJS |
| `GET` | `/protected` | Захищений маршрут (авторизація через JWT) |

### CRUD API для роботи з MongoDB (колекція `users`)

| Метод | Маршрут | Опис |
|:-----|:-------|:-----|
| `POST` | `/insertOne` | Додати одного користувача |
| `POST` | `/insertMany` | Додати кількох користувачів |
| `PATCH` | `/updateOne/:id` | Оновити дані одного користувача |
| `PATCH` | `/updateMany` | Оновити декілька користувачів |
| `PUT` | `/replaceOne/:id` | Замінити користувача повністю |
| `DELETE` | `/deleteOne/:id` | Видалити одного користувача |
| `DELETE` | `/deleteMany` | Видалити кількох користувачів |
| `GET` | `/find` | Знайти користувачів за фільтрами |

> **Примітка:**  
> Для запитів `insertMany`, `updateMany`, `deleteMany`, `find` потрібно надсилати відповідні JSON-тіла (`filter`, `update`, `projection`).

### Формат для `GET /find`
- Можна передавати `filter` та `projection` через query параметри у вигляді JSON:
```
/find?filter={"age":{"$gt":18}}&projection={"name":1,"email":1}
```

## Безпека

- Використання httpOnly cookie для зберігання JWT
- Захист маршрутів через middleware
- Хешування паролів
- Валідація запитів

## Використані технології

- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- PUG шаблонізатор
- cookie-parser
- dotenv
- bcryptjs
