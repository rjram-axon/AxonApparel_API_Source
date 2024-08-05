CREATE TABLE [dbo].[Job_Ord_Sum]
(
	[JobOrdSumId] [int] IDENTITY(1,1) NOT NULL,
	JobOrdNo varchar(20) NULL,
	Styleid int NULL,
	colorid int null,
	sizeid int null,
	quantity numeric(18,3) null,
	finisgqty numeric(18,3) null,
	colorrowid int null,
	sizerowid int null,
	itemid int null,
	itemrowid int null,
	ReceptQty decimal(18,3) NOT NULL,
	CONSTRAINT [PK_Job_Ord_Sum] PRIMARY KEY (JobOrdSumId), 
	CONSTRAINT [FK_Job_Ord_Sum_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item]([ItemId]),
	CONSTRAINT [FK_Job_Ord_Sum_Color] FOREIGN KEY ([ColorId]) REFERENCES [Color]([ColorId]),
	CONSTRAINT [FK_Job_Ord_Sum_Size] FOREIGN KEY ([SizeId]) REFERENCES [Size]([SizeId]),
	CONSTRAINT [FK_Job_Ord_Sum_JobOrdMas] FOREIGN KEY (JobOrdNo) REFERENCES job_ord_mas([job_ord_no])
)
