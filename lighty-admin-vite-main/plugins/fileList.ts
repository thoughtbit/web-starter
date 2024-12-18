import { promises as fs } from "fs"

export default function fileListPlugin(filename: string) {
  return {
    name: "file-list",

    async generateBundle(_: any, bundle: any) {
      const fileList = []

      for (const fileName in bundle) {
        const file = bundle[fileName]

        if (file.type === "asset") {
          const content = `【${fileName}】\n大小：${file.source.length / 1000}KB`
          fileList.push(content)
        }
      }

      const fileContent = fileList.join("\n\n")
      const outputFilePath = `dist/${filename}`

      await fs.writeFile(outputFilePath, fileContent)
    }
  }
}
