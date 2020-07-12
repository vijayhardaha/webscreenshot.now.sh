import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-radio-input",
  templateUrl: "./radio-input.component.html",
  styleUrls: ["./radio-input.component.scss"],
})
export class RadioInputComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() name: string;
  @Input() value: string;
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}
}
