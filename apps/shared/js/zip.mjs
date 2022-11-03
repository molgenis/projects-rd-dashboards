
import fs from 'fs'
import path from 'path'
import zipdir from 'zip-dir'

const zip = (input="dist", output="dist-zip") => {
  const pwd = path.resolve('.');

  const filepath = `${pwd}/package.json`
  const pkgjson = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  
  const inputPath = `${pwd}/${input}`
  const outputDir = `${pwd}/${output}`
  const outputPath = `${outputDir}/${pkgjson.name}.v${pkgjson.version}.zip`
  
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, {recursive: true})
    fs.mkdirSync(outputDir)
  } else {
    fs.mkdirSync(outputDir)
  }
  
  zipdir(inputPath, { saveTo: outputPath })
}

const args = process.argv.slice(2);
zip(...args);