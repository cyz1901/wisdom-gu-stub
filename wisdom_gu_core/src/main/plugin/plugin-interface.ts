interface PluginInterface {
    name: string;
    initialize(): void;
    run(): void;
}

export default PluginInterface;
