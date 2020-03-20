#!/usr/bin/env node

import entrypoint from 'src/cli/entrypoint'
import { createContext } from 'src/ctx/Context'

const rootDir = process.cwd()
const ctx = createContext(rootDir)
entrypoint(ctx)
