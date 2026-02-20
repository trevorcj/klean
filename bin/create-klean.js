#!/usr/bin/env node

const { run } = require('../src/cli')

run().catch((error) => {
  console.error(`\n❌ ${error.message}`)
  process.exit(1)
})
