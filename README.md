I am very lazy for lookup new series on [hdrezka.ag](hdrezka.ag).
So I believe that computer told me when series new episodes was published.
This project is the automation for that task.

Program requests home page of [hdrezka.ag](hdrezka.ag) and parse the list
of last 7 days hot updates for the series episodes.
After that storing data into MongoDB, if we found a new series.

And notifying in console and by email.

  **Dependencies:**

  * NodeJS >=7.10.1;
  * mongoose;
  * nconf;
  * node-cron;
  * nodemailer;
  * puppeteer;
  * MongoDB.

  **Configure:**

Place **config.json** where ever you want.
In repository it placed in root folder.

Below is the example **config.json**:

```json
{
  "mongoose": {
    "db": "mongodb://localhost/hdrezka-notify"
  },
  "notifiersConfig": {
    "email": {
      "email": "vns.scherbina@gmail.com"
    },
    "console": {},
    "telegram": {},
    "email": {}
  },
  "notifiers": [
    "console",
    "telegram",
    "email"
  ],
  "filters": [
    "Флэш",
    "Скорпион",
    "Смертельное оружие",
    "Спецназ / Спецназ города ангелов",
    "Слепая зона / Слепое пятно",
    "Пространство / Экспансия",
    "Электрические сны Филипа К. Дика",
    "ОА",
    "Одаренные",
    "Агенты «Щ.И.Т.»",
    "Вне времени",
    "Игра престолов",
    "Американские боги",
    "По ту сторону",
    "Кремниевая долина / Силиконовая долина",
    "Секретные материалы: возрождение",
    "Видоизмененный углерод"
  ]
}
```

  **Running:**

1) install MongoDB;
2) install NodeJS;
3) git clone https://github.com/sgdreamer7/hdrezka-notify.git
4) cd hdrezka-notify
5) npm install
6) node src/index.js <*path to config file*>/config.json