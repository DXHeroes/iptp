# IF pay THEN pay #HackPrague2020

**IF pay THEN pay** focuses on the way people can manage their finances and aims to break the current not so intuitive financial management of managing payments that banks offer these days.

With our app you can simply create rules based on incoming and outgoing transactions. Every transaction can now trigger automatic actions you define.

Based on the conditions that you set, the transactions in your bank accounts (i.e. incoming or outcoming payments, amounts spent/received or category) a list of actions, defined by you, is then triggered and processed. The system can essentially send out payments without you having to do anything. We aim to make a better option compared to standard standing orders.

Technology-wise speaking, we used NodeJS and NestJS for back-end services with PostgreSQL as a database. For the front-end we used ReactJS with TailwindCSS for styling. Thanks to BankID, that we used as SSO, users have all their banking information available via just one login. Unfortunately, at the moment BankID does not support accessing bank accounts (which will be possible when BankID goes into full production) so we had to integrate with ČSAS's PSD2 APIs directly that allow us to get account details, current account balance, transaction history, and option to create a new transaction.
