import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'hs-field-value',
    template: `<div class="hs-field-value">
        <div class="flex column" *ngIf="value">
            <span class="field-name pb-1">{{ name }}</span>
            <mat-divider></mat-divider>
            <div class="field-value-wrapper pt-2">
                <span class="mat-body-2">{{ value }}</span>
            </div>
        </div>
    </div>`,
    styles: [`
    .field-name {
        font-size: 120%;
        font-weight: 400;
    }

    .field-value-wrapper {

    }
    `]
})
export class FieldValueComponent implements OnInit {
    @Input() name!: string;
    @Input() value!: string | number ;

    constructor() { }

    ngOnInit() { }
}