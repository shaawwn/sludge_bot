import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Commands (sync with git)

const SLUDGE_TEST_COMMAND = {
    name: "sludgetest",
    description: "basic command",
    integration_types: [0, 1],
    contexts: [0, 1, 2]
}

const ALL_COMMANDS = [SLUDGE_TEST_COMMAND]
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS)


