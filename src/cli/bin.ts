#!/usr/bin/env node

import entrypoint from 'src/cli/entrypoint'
import { createContext } from 'src/ctx/Context'

const ctx = createContext()
entrypoint(ctx)
