import { Command } from 'commander'
import dotenv from 'dotenv'
import execa from 'execa'
import path from 'path'

dotenv.config()

const packageRoot = path.join(__dirname, '../')

const program = new Command('niknak-migrate')

console.log(process.env.DATABASE_URL)

const dev = new Command('dev').action(async () => {
    const { DATABASE_URL = '' } = process.env

    if (DATABASE_URL.indexOf('localhost') == -1) {
        console.error(
            'Dev migrations can only be run on localhost. Please change your DATABASE_URL.'
        )

        return
    }

    await execa('npx', ['prisma', 'migrate', 'dev'], {
        env: {
            NODE_ENV: 'development',
        },
        stderr: 'inherit',
        stdin: 'inherit',
        stdout: 'inherit',
        cwd: packageRoot,
    })

    await execa('yarn', ['build'], {
        env: {
            NODE_ENV: 'development',
        },
        stderr: 'inherit',
        stdin: 'inherit',
        stdout: 'inherit',
        cwd: packageRoot,
    })
})

const devCreate = new Command('dev:create').action(async () => {
    const { DATABASE_URL = '' } = process.env

    if (DATABASE_URL.indexOf('localhost') == -1) {
        console.error(
            'Dev migrations can only be run on localhost. Please change your DATABASE_URL.'
        )

        return
    }

    await execa('npx', ['prisma', 'migrate', 'dev', '--create-only'], {
        env: {
            NODE_ENV: 'development',
        },
        stderr: 'inherit',
        stdin: 'inherit',
        stdout: 'inherit',
        cwd: packageRoot,
    })
})

program.addCommand(dev)
program.addCommand(devCreate)

program.parse(process.argv)
