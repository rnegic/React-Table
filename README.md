# Иерархическая таблица данных с сортировкой и фильтрацией на Vite + React + Typescript

Тестовое задание. 

Веб-приложение отображает данные из исходного json-файла в таблицу.

# Функционал:

* Раскрытие строк: строки, у которых есть дочерние элементы, можно раскрыть и посмотреть вложенные данные.
* Сортировка: можно сортировать данные по столбцам баланса и почты
* Фильтрация: данные можно отфильтровать по свойству isActive
* Адаптивность: таблица отлично показывается и раскрываются на всех устройствах, включая десктопные и мобильные.

# Особенности:

* Использован компонентный функциональный подход и хуки (useState, useMemo)
* Оптимизация производительности с помощью кеширования (useMemo)
* Типобезопасность: использовал Typescript, повсеместно определял интерфейсы
* Null-safety
* Продуман UI/UX для удобной навигации

Приложение залито на github pages:
https://rnegic.github.io/React-Table/
