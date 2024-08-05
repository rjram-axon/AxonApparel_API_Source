using AxonApparel.Business.Interface.Api;
using AxonApparel.Repository.Implementation.Api;
using AxonApparel.Repository.Interface.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using AxonApparel.Contract.Api;

namespace AxonApparel.Business.Implementation.Api
{
    public class ApiStockStatusBusines : IApiStockStatusBusiness
    {
        IApiStockStatusRepository Apistock = new ApiStockStatusRepository();
        public List<string> GetFilterdetails()
        {
            List<String> data = new List<String>();
            var query = Apistock.GetFilterDetails("COMPANY").ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("BUYER").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("EMPLOYEE").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("ORDER").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("STYLE").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("REFNO").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("ITEM").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("COLOR").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("SIZE").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            query = Apistock.GetFilterDetails("STOREUNIT").ToList();
            result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);

            return data;


        }

        

        public List<string> GetStockDetails(ApiStockFilter filter)
        {
            List<String> data = new List<String>();
            var query = Apistock.GetStockdetails(filter).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            return data;
        }

        

        public List<string> GetStockorderdetails(ApiStockFilter filter)
        {
            List<String> data = new List<String>();
            var query = Apistock.GetStockordersummary(filter).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            return data;
        }

        public List<string> GetStockTrackingdetails(ApiStockFilter filter)
        {
            List<String> data = new List<String>();
            var query = Apistock.GetStockTracking(filter).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            return data;
        }
        public List<string> GetStockcategory(string otype)
        {
            List<string> data = new List<string>();
            var query = Apistock.GetItemStockCategory(otype).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            return data;            
        }
        public List<string> Getstockitemwise(string itemtype, string trannstype)
        {
            List<string> data = new List<string>();
            var query = Apistock.GetStockinItemwise(itemtype, trannstype).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            return data;
        }

        public List<string> Getstocktransaction(string itemtype)
        {
            List<string> data = new List<string>();
            var query = Apistock.GetItemStocktransactiondetails(itemtype).ToList();
            var result = JsonConvert.SerializeObject(query.ToList());
            data.Add(result);
            return data;
        }

        public List<string> Getstockdetails(int id,string itemtype,string transtype)
        {
            List<string> data = new List<string>();
            switch (id)
            {
                case 1:
                    var query = Apistock.GetItemStocktransactiondetails(itemtype).ToList();
                    var result = JsonConvert.SerializeObject(query.ToList());
                    data.Add(result);
                    break;
                case 2:
                    var query1 = Apistock.GetStockinItemwise(itemtype, transtype).ToList();
                    result = JsonConvert.SerializeObject(query1.ToList());
                    data.Add(result);
                    break;
            }
            return data;
        }
    }
}
