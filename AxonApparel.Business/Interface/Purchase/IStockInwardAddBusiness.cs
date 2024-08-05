using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business.Interface
{
    public interface IStockInwardAddBusiness
    {
        Response<IQueryable<Domain.StockInward>> GetjobordnoDetails(int cmpid);
        Response<IQueryable<Domain.StockInward>> GetordnoDetails(int cmpid);
        Response<IQueryable<Domain.StockInward>> GetrefnoDetails(int cmpid);
        Response<IQueryable<Domain.StockInward>> GetitemgrpDetails(string jobordno);
        Response<IQueryable<Domain.UnitGrnDet>> GetLoadgridDetails(string jobordno);
        Response<IQueryable<Domain.StockInward>> GetLoadsupplier();
        Response<IQueryable<Domain.UnitGrnDet>> GetLoadonprocess(string jobordno, int pid);
        Response<IQueryable<Domain.UnitGrnDet>> GetLoadonitmgrp(string jobordno, int itmid);
        Response<bool> CreateUnitEntry(Domain.UnitGrnMas GrnEntry);
        Response<bool> Delete(int id);
        Response<IQueryable<Domain.UnitGrnMas>> GetLoadoneditgrnno( int mid);
        Response<IQueryable<Domain.UnitGrnMas>> GetDataMainList(int URNMasid);
        Response<IQueryable<Domain.UnitGrnDet>> GetLoadgrid(int mid,string jobordno,string type);
        Response<IQueryable<Domain.UnitGrnMas>> GetLoadoneditdet(string jobordno);
        Response<bool> Update(Domain.UnitGrnMas obj);
    }
}
