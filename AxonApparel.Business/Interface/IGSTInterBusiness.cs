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
    public interface IGSTInterBusiness
    {
        Response<IEnumerable<GSTModel>> GetGSTList();
        

        Response<GSTModel> GetGSTModel(int GSTId);

        Response<int> CreateGSTModel(GSTModel GSTAdd);

        Response<bool> UpdateGSTModel(GSTModel GSTUpd);

        Response<bool> DeleteGSTModel(int GSTID);

        Response<IList<GSTModel>> GetGSTRefDetails(int GSTID);
      
      
    }
}
