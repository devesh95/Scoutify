Scoutify
========

There’s nothing worse than walking out of one of a series of back to back meetings and realizing that the next meeting starts now… and that it’s a half an hour away.

While most people plan their days with a calendar, many do not consider travel time as a critically important variable. Scoutify aims to solve part of that problem of geographic distance-induced lateness. Scoutify allows users to connect with calendars and events from both Google Calendar and Facebook, and visually displays those events on a map. After planning a route and allowing the user to select the relevant mode of transportation, a geolocation algorithm warns the user of event interference and travel time extremities. The user can further optimize their route, in which an algorithm finds the most efficient order in which to complete all listed tasks and events (all features we're proud of). Scoutify also affords users the option of sending themselves an e-mail, containing a map of their daily events, along with steps-by-step directions for a selected most of transportation.

The Team
--------

As a team, we were inspired for a simple reason: we're busy students as most are, and frequently miss important events because of the time required for transit. As our schedules have become tighter over the years, we've realized, as most do, that taking travel time into account is important. Always wanting a broader birds' eye view of our events, however, motivated us to think of a solution, and Scoutify was born.

The Target
----------

Like us, our target user is busy. Students, who might need to understand walking time between classes; parents, who need to balance their work and childcare responsibilities; businesspeople, who constantly traverse city streets en route to meetings: all can benefit from understanding where and how they can make their schedules more efficient.

Development
-----------

Scoutify development is standardized around Javascript and JQuery providing a backbone on which a slew of API interactions take place. Google Calendar, Google Geolocation, Google Maps, Facebook, and MailChimp/Mandrill APIs are harnessed seamlessly across the user flow. Despite somewhat consistent documentation, the team experienced several API-related problems throughout the development process with cookie-related issues, REST redirect-URI inflexibilities, and inconsistent data formats. Bugs were persistent, and unknown caching of certain data made fixing problems especially difficult. Through trial and error, nonetheless, the team persisted, asked for assistance, and ultimately worked through compatibility issues.

Development began slowly: we started out using local servers to test most of our code. It wasn't until early Sunday morning that we began pushing to Github, setting up a Github.io page and a domain, and looking at how things worked in production. Our diligence in how we worked in our local development environment ended up helping us tremendously once we pushed code remotely and tested things on the site; we had disposed of nearly every issue when we previously vetted our code.

Overall, Scoutify functions as a fantastic resource to not only visualize and plan one’s day of events, but also to prevent conflicts and make easier travel between events. We hope that it allows users to take a step back and understand their days on a higher-level: making better scheduling decisions, minimizing travel hassles, and living more productive lives.

