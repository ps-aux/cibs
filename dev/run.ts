#!/usr/bin/env ts-node
import { createApp } from '../src/app'

createApp(process.cwd()).run().catch(console.error)
