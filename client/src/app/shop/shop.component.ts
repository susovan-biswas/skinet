import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../models/product';
import { Brand } from '../models/brand';
import { Type } from '../models/type';
import { ShopParams } from '../models/shopParams';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchText?: ElementRef;
  products:Product[]=[];
  brands:Brand[]=[];
  types:Type[]=[];
  shopParams= new ShopParams();
  sortOptions=[
    {name:'A-Z', value:'name'},
    {name:'Price: Low to High', value:'priceAsc'},
    {name:'Price: High to Low', value:'priceDesc'}
  ];
  totalCount=0;
  constructor(private shopService:ShopService) {
    
    
  }
  ngOnInit(): void {
    
this.getTypes();
this.getBrands();
this.getProducts();
    
  }

  getProducts()
  {
    this.shopService.getProducts(this.shopParams).subscribe({
      next:response => {
        this.products = response.data;
        this.shopParams.pageSize = response.pageSize;
        this.shopParams.pageNumber = response.pageIndex;
        this.totalCount = response.count;
      },
      error: error=>console.log(error)
    });
  }

  getBrands()
  {
    this.shopService.getBrands().subscribe({
      next:response => this.brands = [{id:0, name:'All'}, ...response],
      error: error=>console.log(error)
    });
  }
  getTypes()
  {
    this.shopService.getTypes().subscribe({
      next:response => this.types = [{id:0, name:'All'}, ...response],
      error: error=>console.log(error)
    });
  }

  onBrandSelected(brandId:number){
    this.shopParams.pageNumber=1;
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:number){
    this.shopParams.pageNumber=1;
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(event:any)
  {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event:any)
  {
    if(this.shopParams.pageNumber !== event.page)
    {
      this.shopParams.pageNumber = event;
      this.getProducts(); 
    }
  }

  onSearch()
  {
    this.shopParams.pageNumber=1;
    this.shopParams.search=this.searchText?.nativeElement.value;
    this.getProducts();
  }

  onReset()
  {
    if(this.searchText)
    {
      this.searchText.nativeElement.value='';
      this.shopParams = new ShopParams();
      this.getProducts();
    }
  }

}
