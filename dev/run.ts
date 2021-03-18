#!/usr/bin/env ts-node
import { createApp } from '../src/app'

process.env.NODE_PATH = '.'

createApp(process.cwd()).run().catch(console.error)
