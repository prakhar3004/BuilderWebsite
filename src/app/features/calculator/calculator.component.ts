import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

export interface QualityPackage {
  id: string;
  name: string;
  badge: string;
  ratePerSqFt: number;
  description: string;
  features: string[];
}

export interface MaterialEstimate {
  name: string;
  icon: string;
  unit: string;
  factor: number;
  rate: number;
  quantity: number;
  totalCost: number;
  formattedQty: string;
  specText: string;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  activeTab: 'cost' | 'material' = 'cost';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'material') {
        this.activeTab = 'material';
      } else if (params['tab'] === 'cost') {
        this.activeTab = 'cost';
      }
      this.cd.markForCheck();
    });
  }

  // --- Calculator 1 Inputs ---
  plotArea: number = 1000;
  areaUnit: 'sqft' | 'gaz' = 'sqft';
  floors: number = 2; // G+1
  selectedPackageId: string = 'premium';

  packages: QualityPackage[] = [
    {
      id: 'standard',
      name: 'Standard Package',
      badge: 'Economy / Rental',
      ratePerSqFt: 1550,
      description: 'Durable quality construction suitable for rental properties and budget homes.',
      features: [
        'UltraTech / ACC Grade 43 Cement',
        'FE 500 TMT Steel Bars',
        'First Class Red Bricks',
        '2x2 ft Vitrified Flooring Tiles',
        'Jaquar / Cera Sanitaryware',
        'Asian Paints Tractor Emulsion'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Package',
      badge: 'Most Popular',
      ratePerSqFt: 1950,
      description: 'High-end structural & finishing materials designed for luxury family villas.',
      features: [
        'UltraTech Super Grade 53 / Weather Plus Cement',
        'Tata Tiscon / Jindal Panther FE 550D TMT',
        'AAC Lightweight Blocks / Red Bricks',
        '4x2 ft Premium GVT Vitrified Tiles / Granite',
        'Kohler / Jaquar Select Fittings',
        'Asian Paints Royale Luxury Emulsion',
        'Teakwood Main Door & UPVC Windows'
      ]
    },
    {
      id: 'luxury',
      name: 'Ultra Luxury Package',
      badge: 'Royal Villa Standard',
      ratePerSqFt: 2750,
      description: 'Opulent architecture with imported Italian marble, smart home automation & premium elevation.',
      features: [
        'Grade 53 PPC / PSC Special Cement',
        'High Ductile FE 550D TMT Earthquake Resistant',
        'Italian Marble (Botticino / Dyna) & Teak Hardwood',
        'Grohe / Toto Concealed Thermostatic Sanitary',
        'Fenesta Soundproof UPVC Double Glazed Glass',
        'Smart Home Automation & Concealed VRV Conduit',
        'Designer False Ceiling & Exterior HPL Facade'
      ]
    }
  ];

  // Custom Material Unit Rates (User customizable)
  cementRate: number = 380;       // per 50kg bag
  steelRate: number = 65;         // per kg
  sandRate: number = 55;          // per cu. ft.
  aggregateRate: number = 45;     // per cu. ft.
  brickRate: number = 9;          // per piece
  tileRate: number = 65;          // per sq. ft.
  paintRate: number = 260;        // per liter

  // --- Computed Properties for Cost Calculator ---
  get areaInSqFt(): number {
    return this.areaUnit === 'gaz' ? this.plotArea * 9 : this.plotArea;
  }

  get totalBuiltUpArea(): number {
    return this.areaInSqFt * this.floors;
  }

  get currentPackage(): QualityPackage {
    return this.packages.find(p => p.id === this.selectedPackageId) || this.packages[1];
  }

  get totalEstimatedCost(): number {
    return this.totalBuiltUpArea * this.currentPackage.ratePerSqFt;
  }

  get civilWorkCost(): number {
    return Math.round(this.totalEstimatedCost * 0.58);
  }

  get finishingCost(): number {
    return Math.round(this.totalEstimatedCost * 0.22);
  }

  get MEPCost(): number {
    return Math.round(this.totalEstimatedCost * 0.12);
  }

  get laborCost(): number {
    return Math.round(this.totalEstimatedCost * 0.08);
  }

  // --- Computed Properties for Material Calculator ---
  get materialEstimates(): MaterialEstimate[] {
    const area = this.totalBuiltUpArea;

    // IS Thumb Rules per sq ft
    const cementBags = Math.round(area * 0.42);
    const steelKg = Math.round(area * 4.0);
    const sandCft = Math.round(area * 1.8);
    const aggCft = Math.round(area * 1.35);
    const bricksCount = Math.round(area * 19);
    const tilesSqFt = Math.round(area * 1.3);
    const paintLiters = Math.round(area * 0.18);

    return [
      {
        name: 'Cement',
        icon: '🧱',
        unit: 'Bags (50kg)',
        factor: 0.42,
        rate: this.cementRate,
        quantity: cementBags,
        totalCost: cementBags * this.cementRate,
        formattedQty: `${this.formatNumber(cementBags)} Bags`,
        specText: 'UltraTech / ACC Grade 53 PPC'
      },
      {
        name: 'Steel (TMT Bars)',
        icon: '⚙️',
        unit: 'Kg / Tonnes',
        factor: 4.0,
        rate: this.steelRate,
        quantity: steelKg,
        totalCost: steelKg * this.steelRate,
        formattedQty: `${this.formatNumber(steelKg)} Kg (${(steelKg / 1000).toFixed(2)} Tonnes)`,
        specText: 'Tata Tiscon / Jindal FE 550D'
      },
      {
        name: 'Sand (M-Sand / Coarse)',
        icon: '🏖️',
        unit: 'Cu. Ft. (Cft)',
        factor: 1.8,
        rate: this.sandRate,
        quantity: sandCft,
        totalCost: sandCft * this.sandRate,
        formattedQty: `${this.formatNumber(sandCft)} Cft (${(sandCft / 100).toFixed(1)} Brass)`,
        specText: 'Double Washed River Sand / M-Sand'
      },
      {
        name: 'Aggregate (Rori 10mm & 20mm)',
        icon: '🪨',
        unit: 'Cu. Ft. (Cft)',
        factor: 1.35,
        rate: this.aggregateRate,
        quantity: aggCft,
        totalCost: aggCft * this.aggregateRate,
        formattedQty: `${this.formatNumber(aggCft)} Cft (${(aggCft / 100).toFixed(1)} Brass)`,
        specText: 'Hard Blue Metal Machine Crushed'
      },
      {
        name: 'Bricks / AAC Blocks',
        icon: '🏗️',
        unit: 'Pcs',
        factor: 19,
        rate: this.brickRate,
        quantity: bricksCount,
        totalCost: bricksCount * this.brickRate,
        formattedQty: `${this.formatNumber(bricksCount)} Bricks`,
        specText: 'Class 1 Red Clay / AAC Blocks'
      },
      {
        name: 'Flooring & Wall Tiles',
        icon: '⬛',
        unit: 'Sq. Ft.',
        factor: 1.3,
        rate: this.tileRate,
        quantity: tilesSqFt,
        totalCost: tilesSqFt * this.tileRate,
        formattedQty: `${this.formatNumber(tilesSqFt)} Sq. Ft.`,
        specText: 'GVT Double Charge / Vitrified'
      },
      {
        name: 'Paints & Primer',
        icon: '🎨',
        unit: 'Liters',
        factor: 0.18,
        rate: this.paintRate,
        quantity: paintLiters,
        totalCost: paintLiters * this.paintRate,
        formattedQty: `${this.formatNumber(paintLiters)} Liters`,
        specText: 'Asian Paints Royal Emulsion + Primer'
      }
    ];
  }

  get totalMaterialCost(): number {
    return this.materialEstimates.reduce((sum, item) => sum + item.totalCost, 0);
  }

  // --- Helper Methods ---
  setTab(tab: 'cost' | 'material') {
    this.activeTab = tab;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge'
    });
    this.cd.markForCheck();
  }

  selectPackage(pkgId: string) {
    this.selectedPackageId = pkgId;
    this.cd.markForCheck();
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  }

  formatLakhs(val: number): string {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }

  formatNumber(val: number): string {
    return new Intl.NumberFormat('en-IN').format(val);
  }

  getWhatsAppUrl(): string {
    const text = `Hello Naveen Sharma ji (Krishna Construction), I used your Civil Construction Calculator for my project:\n` +
      `• Plot Area: ${this.plotArea} ${this.areaUnit.toUpperCase()} (${this.totalBuiltUpArea} Sq. Ft. Built-up)\n` +
      `• Floors: ${this.floors} (${this.getFloorLabel()})\n` +
      `• Package: ${this.currentPackage.name} (@ ₹${this.currentPackage.ratePerSqFt}/sqft)\n` +
      `• Estimated Total Cost: ${this.formatLakhs(this.totalEstimatedCost)}\n\n` +
      `Please provide a formal BOQ and consultation for my property in Gurugram.`;
    return `https://wa.me/919717077387?text=${encodeURIComponent(text)}`;
  }

  getFloorLabel(): string {
    switch (this.floors) {
      case 1: return 'Ground Floor Only';
      case 2: return 'G + 1 Floor';
      case 3: return 'G + 2 Floors';
      case 4: return 'G + 3 Floors';
      case 5: return 'G + 4 Floors';
      default: return `G + ${this.floors - 1} Floors`;
    }
  }
}
