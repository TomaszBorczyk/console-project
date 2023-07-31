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
            name: 'private1',
            children: [
                {
                    name: 'private2',
                    children: [
                        {
                            name: 'private3',
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
};


export const FILE_SYSTEM: Directory = populateRootDirectory(fileSystem);
