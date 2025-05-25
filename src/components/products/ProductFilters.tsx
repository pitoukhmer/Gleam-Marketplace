
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';

// This is a placeholder. Actual filtering logic would require state management and data fetching.
const ProductFilters = ({ onFilterChange }: { onFilterChange?: (filters: any) => void }) => {
  const [metalType, setMetalType] = useState('');
  const [karat, setKarat] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({ metalType, karat, priceRange });
    }
    // console.log("Applying filters:", { metalType, karat, priceRange });
  };

  const handleClearFilters = () => {
    setMetalType('');
    setKarat('');
    setPriceRange([0, 5000]);
    if (onFilterChange) {
      onFilterChange({});
    }
  }

  return (
    <Card className="shadow-lg bg-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-xl flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filter Products
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div>
          <Label htmlFor="metalType" className="text-base font-medium">Metal Type</Label>
          <Select value={metalType} onValueChange={setMetalType}>
            <SelectTrigger id="metalType" className="w-full mt-1">
              <SelectValue placeholder="Select Metal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="karat" className="text-base font-medium">Karat</Label>
          <Select value={karat} onValueChange={setKarat}>
            <SelectTrigger id="karat" className="w-full mt-1">
              <SelectValue placeholder="Select Karat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="14k">14K</SelectItem>
              <SelectItem value="18k">18K</SelectItem>
              <SelectItem value="22k">22K</SelectItem>
              <SelectItem value="24k">24K</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
            <Label className="text-base font-medium">Price Range</Label>
            <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
            </div>
            <Slider
                defaultValue={[0, 5000]}
                min={0}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mt-2"
            />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button onClick={handleApplyFilters} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Apply Filters</Button>
          <Button onClick={handleClearFilters} variant="outline" className="w-full">
            <X className="mr-2 h-4 w-4"/> Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
