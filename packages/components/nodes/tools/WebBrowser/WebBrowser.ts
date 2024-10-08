import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { Embeddings } from '@langchain/core/embeddings';
import { WebBrowser } from 'langchain/tools/webbrowser';
import { INode, INodeData, INodeParams } from '../../../src/Interface';
import { getBaseClasses } from '../../../src/utils';

class WebBrowser_Tools implements INode {
    label: string;
    name: string;
    version: number;
    description: string;
    type: string;
    icon: string;
    category: string;
    baseClasses: string[];
    inputs: INodeParams[];

    constructor() {
        this.label = 'Web Browser';
        this.name = 'webBrowser';
        this.version = 1.0;
        this.type = 'WebBrowser';
        this.icon = 'webBrowser.svg';
        this.category = 'Tools';
        this.description = 'Gives agent the ability to visit a website and extract information';
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            }
        ];
        this.baseClasses = [this.type, ...getBaseClasses(WebBrowser)];
    }

    async init(nodeData: INodeData): Promise<any> {
        const model = nodeData.inputs?.model as BaseLanguageModel;
        const embeddings = nodeData.inputs?.embeddings as Embeddings;

        // Set custom headers to include a legitimate User-Agent string
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        };

        // Pass the headers when initializing the WebBrowser agent
        return new WebBrowser({ model, embeddings, headers });
    }
}

module.exports = { nodeClass: WebBrowser_Tools };
