#!/usr/bin/env ts-node
process.env.NODE_PATH = '.'

import { createApp } from '../src/app'

createApp().run().catch(console.error)
