import {Directory, populateRootDirectory, SimpleDirectory} from '../ui/system/structure';

const fileSystem: SimpleDirectory = {
    name: '/',
    children: [
        {
            name: 'hi',
            extension: 'txt',
            contents: 'siema'
        },
        {
            name: 'private',
            children: []
        }
    ]
};


export const FILE_SYSTEM: Directory = populateRootDirectory(fileSystem);
