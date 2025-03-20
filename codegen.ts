import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
    schema: 'schema.graphql',
    documents: ['./src/graphql/queries.ts'],
    generates: {
        './generated/': {
            preset: 'client',
            plugins: [
                'typescript',
                'typescript-operations',
                {
                  add: {
                    content: '// @ts-nocheck',
                  },
                },
              ],
        },
    }
}
 
export default config