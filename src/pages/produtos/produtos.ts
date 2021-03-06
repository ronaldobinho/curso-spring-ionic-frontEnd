import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  page : number = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public produtoService : ProdutoService,
public loadingCtrl : LoadingController) {
  }

  ionViewDidLoad() {

   this.loadData();
}

loadData() {
  let categoria_id = this.navParams.get('categoria_id');
  let loader = this.presentLoading();
  this.produtoService.findByCategoria(categoria_id, this.page, 10)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length - 1;
      loader.dismiss();
      console.log(this.page);
      console.log(this.items);
      this.loadImageUrls(start, end);
    },
    error => {
      loader.dismiss();
    });
}

loadImageUrls(start: number, end: number) {
  for (var i=start; i<=end; i++) {
    let item = this.items[i];
    this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.buckectBaseUrl}/prod${item.id}-small.jpg`;
      },
      error => {});
  }
}  
    showDetails(produto_id){
      this.navCtrl.push("ProdutoDetailPage", {produto_id : produto_id});
    }  

    presentLoading() {
            let loading = this.loadingCtrl.create({
              content: 'Carregando',
            
            });
            loading.present();
            return loading;
          
        }

        doRefresh(refresher) {
          this.page = 0;
          this.items = [];
          this.loadData();
          setTimeout(() => {
            refresher.complete();
          }, 1500);
        }

        doInfinite(infiniteScroll) {
          this.page++;
          this.loadData();
          
          setTimeout(() => {
            infiniteScroll.complete();
          }, 1500);
        }

      }

