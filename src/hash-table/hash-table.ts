export class HashTable<T, U> {
    private data: Array<[T, U] | undefined>;
    private _count = 0;

    public get count(): number {
        return this._count;
    }


    public constructor(size: number) {
        this.data = new Array(size);
    }

    public set(key: T, value: U): void {
        if (this.count === this.data.length) this.resize();
        const index = this.probe(key);

        this.data[index] = [key,value];
        this._count++;
    }


    public get(key: T): U | undefined {
        const index = this.probe(key);
        return this.data[index]?.[1];
    }


    public remove(key: T): void {
        const index = this.probe(key);
        if (this.data[index]) {
            this.data[index] = undefined;
            this._count--;

            if (Math.ceil(this._count * 2) <= this.data.length)
                this.resize();
        }
    }

    public keys(): Array<T> {
        const keys: Array<T> = [];

        this.data.forEach(item => {
            if (item) keys.push(item[0]);
        });

        return keys;
    }

    private resize(shrink?: boolean): void {
        const multiplier = shrink ? .5 : 2;
        const newData = [...this.data];
        this.data = new Array(this.data.length * Math.ceil(multiplier));
        this._count = 0;
        newData.forEach(item => {
            if (item) this.set(item[0], item[1]);
        });
    }

    private probe(key: T) {
        let index = this.hash(key);
        let count = 0;
        let currentItem = this.data[index];

        while (currentItem && currentItem[0] !== key && count < this.data.length) {
            if (index === this.data.length - 1)
                index = 0;
            else
                index++;
            count++;

            currentItem = this.data[index];
        }
        return index;
    }

    private hash(key: T): number {
        let hash = 0;
        for (let i  = 0; i < JSON.stringify(key).length; i++) {
            hash = (hash + JSON.stringify(key).charCodeAt(i) * i) % this.data.length;
        }
        return hash;
    }

}
