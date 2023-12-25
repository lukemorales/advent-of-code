import assert from 'assert';

export function currentFolder(directory: string) {
  const [_, folder] = directory.split('src/');
  assert.ok(folder, 'File is outside of the source folder');

  return folder;
}
