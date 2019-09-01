# Memorize
Скачиваем и устанавливаем зависимости:
```sh
git clone https://github.com/terdenan/memorize.git
cd memorize
npm install
```
  
В файл с переменными окружения `.env` записываем:
```sh
REACT_APP_VERSION=$npm_package_version
```
  
Запуск:
```sh
npm run start
```
Собрать проект:
```sh
npm run build
```

### Работа с Firebase Function
Положить в директорию `functions` файл `service-account.json`.
```sh
cd functions
npm install
firebase functions:config:get > .runtimeconfig.json
```
Вписать в `.runtimeconfig.json` поле `environment` со значением `dev`.
```sh
npm start
```
