const launchGameBtn=document.getElementById("launch-game-button")
launchGameBtn.addEventListener('click', async () => {
    const gamePath = await window.electronAPI.openFile()
    window.electronAPI.writeData('GamePath.txt',gamePath)
})
