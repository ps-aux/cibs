#!/usr/bin/env ts-node
import { createApp } from '../src/app'

process.env.NODE_PATH = '.'

createApp().run().catch(console.error)
