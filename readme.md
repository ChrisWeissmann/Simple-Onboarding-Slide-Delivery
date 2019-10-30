# Simple On-boarding Slide Delivery

I wanted to show some on-boarding slides to test a prototype and was not happy with what is currently out there.
Always a bunch of trackers and kind of slow etc, so I build a simple one my self.
To simplify things I used the glide library for the carousel https://glidejs.com/


This one does track the timestamps of when a slide was swiped as well as what kind of device is being used.
When the link to the survey is clicked the data is sent to a php endpoint included in this package.
Its a super simple endpoint that sends an email with the data to a defined email.
When the visitor lands on the website a unique Id is generated, this id is part of the data sent out.
The survey is pre populated with this id to connect the timestamp data and the survey data.
The group Id, also generated on landing, defines which prototype will be shown.
This is done by manipulating the link to the prototype images according to the group Id.


The privacy policy was written by me in the context of a prototype testing with the FU Berlin.
Please be sure to adjust and write an own one.

## Setup

Run `yarn` to install packages

For development run

```Shell
yarn dev
```

To test with running php endpoint

```Shell
yarn dev:php
```

To package

```Shell
yarn build:prod
```

To preview the production environment without php

```Shell
yarn preview
```

## Deploy

After packaging with `yarn build:prod`just drop the files on a webspace that has php and your good to go. (Assuming it is reachable via the internet)
The site is a simple static site and the php endpoint doesn't need write access.
So permissions shouldn't be an issue.