/**
 * App Launcher
 * Grid or start menu of available apps
 */

// Define Heroicons SVG paths
const heroicons = {
  calculator: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Z" clip-rule="evenodd" /></svg>',
  'text-editor': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" /><path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" /></svg>',
  'file-browser': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" /></svg>',
  terminal: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" /></svg>',
  settings: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" /></svg>',
  browser: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5Z" clip-rule="evenodd" /></svg>',
  'todo-list': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" /><path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" /></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" /><path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" /></svg>',
  mail: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" /><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" /></svg>',
  photos: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" /></svg>',
  music: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clip-rule="evenodd" /></svg>',
  chat: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" /><path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" /></svg>',
  ai: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" /></svg>',
  'ui-components': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 0 1-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 0 1 6.126 3.537ZM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 0 1 0 .75l-1.732 3c-.229.397-.76.5-1.067.161A5.23 5.23 0 0 1 6.75 12a5.23 5.23 0 0 1 1.37-3.536ZM10.878 17.13c-.447-.098-.623-.608-.394-1.004l1.733-3.002a.75.75 0 0 1 .65-.375h3.465c.457 0 .81.407.672.842a5.252 5.252 0 0 1-6.126 3.539Z" /><path fill-rule="evenodd" d="M21 12.75a.75.75 0 0 0 0-1.5h-.783a8.22 8.22 0 0 0-.237-1.357l.734-.267a.75.75 0 1 0-.513-1.41l-.735.268a8.24 8.24 0 0 0-.689-1.192l.6-.503a.75.75 0 1 0-.964-1.149l-.6.504a8.3 8.3 0 0 0-1.054-.885l.391-.678a.75.75 0 1 0-1.299-.75l-.39.676a8.188 8.188 0 0 0-1.295-.47l.136-.77a.75.75 0 0 0-1.477-.26l-.136.77a8.36 8.36 0 0 0-1.377 0l-.136-.77a.75.75 0 1 0-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 0 0-1.3.75l.392.678a8.29 8.29 0 0 0-1.054.885l-.6-.504a.75.75 0 1 0-.965 1.149l.6.503a8.243 8.243 0 0 0-.689 1.192L3.8 8.217a.75.75 0 1 0-.513 1.41l.735.267a8.222 8.222 0 0 0-.238 1.356h-.783a.75.75 0 0 0 0 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 0 0 .513 1.41l.735-.268c.197.417.428.816.69 1.191l-.6.504a.75.75 0 0 0 .963 1.15l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 0 0 1.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.77a.75.75 0 0 0 1.477.261l.137-.772a8.32 8.32 0 0 0 1.376 0l.136.772a.75.75 0 1 0 1.477-.26l-.136-.771a8.19 8.19 0 0 0 1.294-.47l.391.677a.75.75 0 0 0 1.3-.75l-.393-.679a8.282 8.282 0 0 0 1.054-.885l.601.504a.75.75 0 0 0 .964-1.15l-.6-.503c.261-.375.492-.774.69-1.191l.735.267a.75.75 0 1 0 .512-1.41l-.734-.267c.115-.439.195-.892.237-1.356h.784Zm-2.657-3.06a6.744 6.744 0 0 0-1.19-2.053 6.784 6.784 0 0 0-1.82-1.51A6.705 6.705 0 0 0 12 5.25a6.8 6.8 0 0 0-1.225.11 6.7 6.7 0 0 0-2.15.793 6.784 6.784 0 0 0-2.952 3.489.76.76 0 0 1-.036.098A6.74 6.74 0 0 0 5.251 12a6.74 6.74 0 0 0 3.366 5.842l.009.005a6.704 6.704 0 0 0 2.18.798l.022.003a6.792 6.792 0 0 0 2.368-.004 6.704 6.704 0 0 0 2.205-.811 6.785 6.785 0 0 0 1.762-1.484l.009-.01.009-.01a6.743 6.743 0 0 0 1.18-2.066c.253-.708.39-1.47.39-2.264a6.74 6.74 0 0 0-.408-2.309Z" clip-rule="evenodd" /></svg>',
  close: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" /></svg>'
};

// App registry
const appRegistry = new Map();

// App launcher state
let isVisible = false;
let launcherElement = null;

/**
 * Discover all apps in the apps directory
 * @returns {Promise<string[]>} Array of app IDs
 */
async function discoverApps() {
  console.log('Discovering apps in apps directory...');
  
  try {
    // Get all app directories from the apps directory
    // This uses dynamic imports to get the context of all app directories
    const appContext = import.meta.glob('../apps/*/manifest.json', { eager: true });
    
    // Extract app IDs from the context keys
    const appIds = Object.keys(appContext).map(key => {
      // Extract app ID from path (e.g., '../apps/calculator/manifest.json' -> 'calculator')
      const match = key.match(/\.\.\/apps\/([^/]+)\/manifest\.json/);
      return match ? match[1] : null;
    }).filter(Boolean);
    
    console.log(`Discovered ${appIds.length} apps:`, appIds);
    return appIds;
  } catch (error) {
    console.error('Error discovering apps:', error);
    return [];
  }
}

/**
 * Initialize the app launcher
 * @param {Array} initialApps - Initial apps to load from config (not used anymore)
 * @returns {Object} App launcher API
 */
export async function initAppLauncher(initialApps = []) {
  console.log('Initializing app launcher...');
  
  // Create launcher element
  createLauncherElement();
  
  // Discover all apps in the apps directory
  const discoveredApps = await discoverApps();
  console.log('Discovered apps:', discoveredApps);
  
  // Clear any existing apps from the registry and UI
  appRegistry.clear();
  const appGrid = document.getElementById('app-launcher-grid');
  if (appGrid) {
    appGrid.innerHTML = '';
  }
  
  // Load all discovered apps
  if (discoveredApps.length > 0) {
    await Promise.all(discoveredApps.map(loadApp));
  }
  
  // Return public API
  return {
    loadApp,
    unloadApp,
    launchApp,
    getInstalledApps,
    showLauncher,
    hideLauncher,
    toggleLauncher,
  };
}

/**
 * Create app launcher element
 */
function createLauncherElement() {
  // Check if launcher already exists
  launcherElement = document.getElementById('app-launcher');
  if (launcherElement) return;
  
  // Create launcher container
  launcherElement = document.createElement('div');
  launcherElement.id = 'app-launcher';
  launcherElement.className = 'app-launcher';
  launcherElement.style.position = 'absolute';
  launcherElement.style.top = '0';
  launcherElement.style.left = '0';
  launcherElement.style.width = '100%';
  launcherElement.style.height = '100%';
  launcherElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  launcherElement.style.backdropFilter = 'blur(10px)';
  launcherElement.style.display = 'none';
  launcherElement.style.flexDirection = 'column';
  launcherElement.style.alignItems = 'center';
  launcherElement.style.justifyContent = 'flex-start';
  launcherElement.style.padding = '60px 20px 20px 20px';
  launcherElement.style.zIndex = '1000';
  launcherElement.style.overflow = 'auto';
  
  // Create search bar
  const searchContainer = document.createElement('div');
  searchContainer.className = 'app-launcher-search';
  searchContainer.style.position = 'relative';
  searchContainer.style.width = '100%';
  searchContainer.style.maxWidth = '600px';
  searchContainer.style.marginBottom = '30px';
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search apps...';
  searchInput.className = 'app-launcher-search-input';
  searchInput.style.width = '100%';
  searchInput.style.padding = '12px 20px 12px 45px';
  searchInput.style.fontSize = '18px';
  searchInput.style.borderRadius = '10px';
  searchInput.style.border = 'none';
  searchInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  searchInput.style.color = 'white';
  searchInput.style.outline = 'none';
  
  // Add search icon
  const searchIcon = document.createElement('div');
  searchIcon.className = 'app-launcher-search-icon';
  searchIcon.style.position = 'absolute';
  searchIcon.style.left = '15px';
  searchIcon.style.top = '50%';
  searchIcon.style.transform = 'translateY(-50%)';
  searchIcon.style.width = '20px';
  searchIcon.style.height = '20px';
  searchIcon.style.color = 'rgba(255, 255, 255, 0.7)';
  searchIcon.innerHTML = heroicons.search;
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'app-launcher-close';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '20px';
  closeButton.style.right = '20px';
  closeButton.style.width = '30px';
  closeButton.style.height = '30px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.color = 'white';
  closeButton.style.cursor = 'pointer';
  closeButton.style.display = 'flex';
  closeButton.style.alignItems = 'center';
  closeButton.style.justifyContent = 'center';
  closeButton.innerHTML = heroicons.close;
  closeButton.addEventListener('click', hideLauncher);
  
  // Create app grid
  const appGrid = document.createElement('div');
  appGrid.id = 'app-launcher-grid';
  appGrid.className = 'app-launcher-grid';
  appGrid.style.display = 'grid';
  appGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
  appGrid.style.gap = '20px';
  appGrid.style.width = '100%';
  appGrid.style.maxWidth = '1000px';
  
  // Add search functionality
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const appItems = appGrid.querySelectorAll('.app-launcher-item');
    
    appItems.forEach(item => {
      const appName = item.querySelector('.app-launcher-item-name').textContent.toLowerCase();
      if (appName.includes(query) || query === '') {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
  
  // Assemble the launcher
  searchContainer.appendChild(searchIcon);
  searchContainer.appendChild(searchInput);
  launcherElement.appendChild(closeButton);
  launcherElement.appendChild(searchContainer);
  launcherElement.appendChild(appGrid);
  
  // Add to document
  document.body.appendChild(launcherElement);
}

/**
 * Load an app into the launcher
 * @param {Object} appInfo - App information
 * @returns {Promise<Object>} Loaded app
 */
export async function loadApp(appInfo) {
  console.log(`Loading app: ${appInfo.id}`);
  
  // If appInfo is a string, assume it's an app ID and try to load from apps directory
  if (typeof appInfo === 'string') {
    const appId = appInfo;
    try {
      // Try to load manifest
      const manifestPath = `../apps/${appId}/manifest.json`;
      const appPath = `../apps/${appId}/app.js`;
      
      try {
        // Try to import the manifest
        console.log(`Loading manifest from: ${manifestPath}`);
        const manifestModule = await import(/* @vite-ignore */ manifestPath);
        const manifest = manifestModule.default;
        
        appInfo = {
          id: appId,
          title: manifest.title || appId,
          description: manifest.description || '',
          icon: manifest.icon || null,
          path: appPath
        };
      } catch (error) {
        console.warn(`No manifest found for app ${appId}, using defaults`, error);
        appInfo = {
          id: appId,
          title: appId.charAt(0).toUpperCase() + appId.slice(1).replace(/-/g, ' '),
          description: '',
          path: appPath
        };
      }
      
      // Try to preload the module
      try {
        console.log(`Preloading module from: ${appPath}`);
        const module = await import(/* @vite-ignore */ appPath);
        console.log(`Module loaded for ${appId}:`, module);
        appInfo.module = module;
        if (typeof module.launch === 'function') {
          console.log(`Found launch function in module for ${appId}`);
          appInfo.launch = module.launch;
        } else {
          console.warn(`No launch function found in module for ${appId}`);
        }
      } catch (error) {
        console.warn(`Could not preload app module: ${appId}`, error);
      }
    } catch (error) {
      console.error(`Failed to load app: ${appId}`, error);
      return null;
    }
  }
  
  // Register app
  appRegistry.set(appInfo.id, appInfo);
  
  // Add to grid
  addAppToGrid(appInfo);
  
  return appInfo;
}

/**
 * Add app to the launcher grid
 * @param {Object} appInfo - App information
 */
function addAppToGrid(appInfo) {
  const appGrid = document.getElementById('app-launcher-grid');
  if (!appGrid) return;
  
  // Create app item
  const appItem = document.createElement('div');
  appItem.className = 'app-launcher-item';
  appItem.dataset.appId = appInfo.id;
  appItem.style.display = 'flex';
  appItem.style.flexDirection = 'column';
  appItem.style.alignItems = 'center';
  appItem.style.justifyContent = 'center';
  appItem.style.padding = '15px';
  appItem.style.borderRadius = '10px';
  appItem.style.cursor = 'pointer';
  appItem.style.transition = 'background-color 0.2s';
  
  // Hover effect
  appItem.addEventListener('mouseenter', () => {
    appItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  });
  
  appItem.addEventListener('mouseleave', () => {
    appItem.style.backgroundColor = 'transparent';
  });
  
  // Create app icon
  const appIcon = document.createElement('div');
  appIcon.className = 'app-launcher-item-icon';
  appIcon.style.width = '60px';
  appIcon.style.height = '60px';
  appIcon.style.marginBottom = '10px';
  appIcon.style.display = 'flex';
  appIcon.style.alignItems = 'center';
  appIcon.style.justifyContent = 'center';
  appIcon.style.color = 'white';
  
  // Use heroicons SVG if available, otherwise use default
  const iconSvg = heroicons[appInfo.id] || heroicons.browser;
  
  // Create SVG element properly
  try {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(iconSvg, 'image/svg+xml');
    const svgElement = svgDoc.documentElement;
    
    // Set SVG size and styles
    if (svgElement) {
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
      
      // Import the SVG into the current document
      const importedNode = document.importNode(svgElement, true);
      appIcon.appendChild(importedNode);
    } else {
      throw new Error('SVG parsing failed');
    }
  } catch (error) {
    console.warn('Error parsing SVG, using innerHTML fallback', error);
    // Fallback if SVG parsing fails
    appIcon.innerHTML = iconSvg;
  }
  
  // Create app name
  const appName = document.createElement('div');
  appName.className = 'app-launcher-item-name';
  appName.textContent = appInfo.title || appInfo.id;
  appName.style.fontSize = '14px';
  appName.style.color = 'white';
  appName.style.textAlign = 'center';
  appName.style.overflow = 'hidden';
  appName.style.textOverflow = 'ellipsis';
  appName.style.whiteSpace = 'nowrap';
  appName.style.width = '100%';
  
  // Add click handler
  appItem.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log(`App item clicked: ${appInfo.id}`);
    try {
      const result = await launchApp(appInfo.id);
      console.log(`App launch result:`, result);
      hideLauncher();
    } catch (error) {
      console.error(`Error in app launch click handler:`, error);
    }
  });
  
  // Assemble app item
  appItem.appendChild(appIcon);
  appItem.appendChild(appName);
  
  // Add to grid
  appGrid.appendChild(appItem);
}

/**
 * Unload an app from the launcher
 * @param {string} appId - App ID to unload
 * @returns {boolean} Success
 */
export function unloadApp(appId) {
  // Remove from registry
  if (!appRegistry.has(appId)) return false;
  appRegistry.delete(appId);
  
  // Remove from grid
  const appGrid = document.getElementById('app-launcher-grid');
  if (appGrid) {
    const appItem = appGrid.querySelector(`.app-launcher-item[data-app-id="${appId}"]`);
    if (appItem) {
      appGrid.removeChild(appItem);
    }
  }
  
  return true;
}

/**
 * Launch an app
 * @param {string} appId - App ID to launch
 * @returns {Promise<Object>} Launched app instance
 */
export async function launchApp(appId) {
  console.log(`Launching app: ${appId}`);
  
  // Get app info
  const appInfo = appRegistry.get(appId);
  if (!appInfo) {
    console.error(`App not found: ${appId}`);
    return null;
  }
  
  try {
    // Launch app
    if (typeof appInfo.launch === 'function') {
      // Use the existing launch function
      console.log(`Launching app ${appId} with existing launch function`);
      return await appInfo.launch();
    } else if (appInfo.module && typeof appInfo.module.launch === 'function') {
      // Use the module's launch function
      console.log(`Launching app ${appId} with module launch function`);
      return await appInfo.module.launch();
    } else {
      console.log(`App ${appId} does not have a launch function, trying to load it`);
      
      // Try to load the app module dynamically
      try {
        // First try the path if it exists
        if (appInfo.path) {
          console.log(`Trying to load app from path: ${appInfo.path}`);
          const module = await import(/* @vite-ignore */ appInfo.path);
          appInfo.module = module;
          
          if (typeof module.launch === 'function') {
            console.log(`Found launch function in module, using it`);
            appInfo.launch = module.launch;
            return await module.launch();
          }
        }
        
        // Try to load from apps directory as fallback
        console.log(`Trying to load app from apps directory: ${appId}`);
        const appPath = `../apps/${appId}/app.js`;
        console.log(`Loading from path: ${appPath}`);
        const module = await import(/* @vite-ignore */ appPath);
        
        if (typeof module.launch === 'function') {
          console.log(`Found launch function in fallback module, using it`);
          appInfo.module = module;
          appInfo.launch = module.launch;
          return await module.launch();
        } else {
          console.error(`Module found but no launch function in: ${appId}`);
        }
      } catch (error) {
        console.error(`Failed to load app module: ${appId}`, error);
      }
    }
  } catch (error) {
    console.error(`Error launching app ${appId}:`, error);
  }
  
  return null;
}

/**
 * Get all installed apps
 * @returns {Array} Array of app info objects
 */
export function getInstalledApps() {
  return Array.from(appRegistry.values());
}

/**
 * Show the app launcher
 */
export function showLauncher() {
  if (!launcherElement) createLauncherElement();
  
  launcherElement.style.display = 'flex';
  isVisible = true;
  
  // Focus search input
  const searchInput = launcherElement.querySelector('.app-launcher-search-input');
  if (searchInput) {
    setTimeout(() => searchInput.focus(), 100);
  }
}

/**
 * Hide the app launcher
 */
export function hideLauncher() {
  if (launcherElement) {
    launcherElement.style.display = 'none';
    isVisible = false;
  }
}

/**
 * Toggle the app launcher visibility
 */
export function toggleLauncher() {
  if (isVisible) {
    hideLauncher();
  } else {
    showLauncher();
  }
}