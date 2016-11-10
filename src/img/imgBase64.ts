declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

var source = window["hitplane_source"];
export let imgPlane: HTMLImageElement = source["plane"];

export let imgBoom: HTMLImageElement = source["boom"];

export let imgBulletArr: HTMLImageElement[] = [
    source["bullet01"],
    source["bullet02"],
    source["bullet03"],
    source["enemy_bullet"]
];

export let imgHP: HTMLImageElement = source["hp"]; // HP 图片

export let imgEnemy: HTMLImageElement = source["enemy"]; // 敌军飞机图片

export let imgHeart: HTMLImageElement = source["heart"]; // ❤️ 图片
