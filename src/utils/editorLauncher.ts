/**
 * Launches local projects in VS Code or Cursor via protocol handler
 */
export function openInEditor(projectName: string, editor: 'vscode' | 'cursor' = 'vscode') {
  const localPath = `/mnt/d/project/${projectName}`;
  const uri = `${editor}://file${localPath}`;
  window.open(uri, '_blank');
}
