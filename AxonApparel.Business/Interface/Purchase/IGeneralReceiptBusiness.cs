using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
   public interface IGeneralReceiptBusiness
    {
       Response<bool> CreateUnitEntry(Domain.GeneralMemoRetMas Entry);
       Response< IQueryable<Domain.GeneralMemoRetDet>> GetIssueno();
       Response<IQueryable<Domain.GeneralMemoRetDet>> Loaditm(int masid);
       Response<IQueryable<Domain.GeneralMemoRetMas>> LoadMaingrid(string entryno,int? masid,int? cmpid,int? unitid,string fromdate,string todate);
       Response< IQueryable<Domain.GeneralMemoRetMas>> Loadheaderdet(int masid);
       Response< IQueryable<Domain.GeneralMemoRetDet>> Loadedititmdet(int masid);
       Response<bool> Update(Domain.GeneralMemoRetMas obj);
       Response<bool> Delete(int id);
    }
}
