using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
using System.Web.Mvc;

namespace AxonApparel.Business
{
    public interface IItemBusiness
    {
        /// <summary>
        /// This method will return City list
        /// </summary>
        /// <returns></returns>
        Response<IEnumerable<Item>> GetDropItem();
        Response<IEnumerable<Domain.Item>> GetItem();
        Response<IEnumerable<Domain.Shift>> GetShift();

        Response<IEnumerable<Item>> GetComponent();
        Response<IEnumerable<Item>> GetYarn();
        Response<IEnumerable<Item>> GetHsn();
        Response<IEnumerable<Item>> GetFabric();

        Response<IEnumerable<Domain.Item>> GetAccessoryItem();
        Response<IEnumerable<Domain.Item>> GetGeneralItem();
        Response<IEnumerable<Domain.Item>> GetGarmentItem();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Response<Item> GetItemId(int itemId);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        //Response<Item> GetFItemId(int[] FIG);
           Response<string> GetFItemId(string[] FIG);  
        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<int> CreateItem(Item ItemAdd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<bool> UpdateItem(Item ItemUpd);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="City"></param>
        /// <returns></returns>
        Response<bool> DeleteItem(int ItemId);
        Response<IList<Item>> GetItemCheckItemDetails(int ItemId);
        Response<IList<Item>> GetDataGetGstDetails(string Hsncode);
        Response<IEnumerable<Domain.Item>> GetItembygrpid(string Itemgrpid);
    }
}
