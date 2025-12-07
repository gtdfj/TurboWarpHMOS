if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WebComponent_Params {
    controller?: webview.WebviewController;
    isDark?: boolean;
}
import webview from "@ohos:web.webview";
class WebComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = new webview.WebviewController();
        this.__isDark = new ObservedPropertySimplePU(false, this, "isDark");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WebComponent_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.isDark !== undefined) {
            this.isDark = params.isDark;
        }
    }
    updateStateVars(params: WebComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isDark.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isDark.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: webview.WebviewController;
    private __isDark: ObservedPropertySimplePU<boolean>;
    get isDark() {
        return this.__isDark.get();
    }
    set isDark(newValue: boolean) {
        this.__isDark.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Web.create({ src: { "id": 0, "type": 30000, params: ['index.html'], "bundleName": "com.xinsoft.game1", "moduleName": "entry" }, controller: this.controller });
            Web.darkMode(this.isDark ? WebDarkMode.On : WebDarkMode.Off);
            Web.backgroundColor(this.isDark ? Color.Black : Color.White);
        }, Web);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WebComponent";
    }
}
registerNamedRoute(() => new WebComponent(undefined, {}), "", { bundleName: "com.xinsoft.game1", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
