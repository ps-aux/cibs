#!/usr/bin/env node

import { createApp } from '../app'

createApp(process.cwd()).run().catch(console.error)
