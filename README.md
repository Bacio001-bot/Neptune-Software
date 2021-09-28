# xenon-software | xenon-ts-bot
The following project is a template for all typescript of javascript (if converted) discord bot projects.

## classes.Client.ts:
The `Client.ts` class is an extension of the Discord Client class which injects various functions into the client variable. You use this class to create a bot instance, by calling the class and using the `start()` function to load all commands, events and configurations.

## classes.Events.ts:
The `Events.ts` class is an extension of the custom client class which we already created. It creates the `addHandler()` and `execute()` functions which are used to allow an easier way of using seperate handlers/functions inside your code. The `execute()` function first checks for any handlers added to an event, then runs the handlers in question then runs the event code.

## classes.Command.ts:
The `Command.ts` class is an extension of the custom client class which we already created. It allows for all commands to extend this command class and specify command details in the super.
