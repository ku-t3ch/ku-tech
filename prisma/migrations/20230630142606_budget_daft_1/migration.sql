-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "amount" DOUBLE PRECISION,
    "is_active" BOOLEAN DEFAULT true,
    "budget_type_id" TEXT,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "amount" DOUBLE PRECISION,
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,

    CONSTRAINT "ProjectType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spending" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "amount" DOUBLE PRECISION,
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "Spending_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendingType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,

    CONSTRAINT "SpendingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BudgetToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToProjectType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToSpending" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SpendingToSpendingType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetToProject_AB_unique" ON "_BudgetToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetToProject_B_index" ON "_BudgetToProject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToProjectType_AB_unique" ON "_ProjectToProjectType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToProjectType_B_index" ON "_ProjectToProjectType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToSpending_AB_unique" ON "_ProjectToSpending"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToSpending_B_index" ON "_ProjectToSpending"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpendingToSpendingType_AB_unique" ON "_SpendingToSpendingType"("A", "B");

-- CreateIndex
CREATE INDEX "_SpendingToSpendingType_B_index" ON "_SpendingToSpendingType"("B");

-- AddForeignKey
ALTER TABLE "_BudgetToProject" ADD CONSTRAINT "_BudgetToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetToProject" ADD CONSTRAINT "_BudgetToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToProjectType" ADD CONSTRAINT "_ProjectToProjectType_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToProjectType" ADD CONSTRAINT "_ProjectToProjectType_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToSpending" ADD CONSTRAINT "_ProjectToSpending_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToSpending" ADD CONSTRAINT "_ProjectToSpending_B_fkey" FOREIGN KEY ("B") REFERENCES "Spending"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpendingToSpendingType" ADD CONSTRAINT "_SpendingToSpendingType_A_fkey" FOREIGN KEY ("A") REFERENCES "Spending"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpendingToSpendingType" ADD CONSTRAINT "_SpendingToSpendingType_B_fkey" FOREIGN KEY ("B") REFERENCES "SpendingType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
