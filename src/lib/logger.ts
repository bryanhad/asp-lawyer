import { createLogger, format, transports } from 'winston'

const customFormat = format.printf(({ _timestamp, level, message, label = '', ...meta }) => {
    const splat = meta[Symbol.for('splat')] as unknown[]
    const finalSplat =
        splat && splat.length
            ? (splat.length === 1 ? JSON.stringify(splat[0], null, 2) : JSON.stringify(splat, null, 2))
            : ''
    return `${level} ${label} ${message} ${finalSplat}`
})

export const logger = createLogger({
    level: process.env.L0G_LEVEL || 'silly',
    format: format.combine(
        format((info) => {
            // Adjust formatting based on log level
            if (info.level === 'error') {
                // JSON format for errors
                return {
                    ...info,
                    level: info.level.toUpperCase(),
                    message: JSON.stringify(
                        {
                            message: info.message,
                        },
                        null,
                        2,
                    ),
                }
            }
            // Default formatting for other levels
            return {
                ...info,
                level: info.level.toUpperCase(),
            }
        })(),
        format.timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        format.colorize({ all: true }), // Add color to the entire log line
        customFormat,
        format.align(),
    ),
    transports: [new transports.Console()],
})
