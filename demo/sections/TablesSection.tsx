export { TablesSection } from '../../ui/sections/TablesSection';
      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold border-b pb-2">Tables</h2>
        <p className="text-base-content/70">
          Responsive data tables with support for zebra striping, row highlighting, and various sizes.
        </p>
      </div>

      <Card bordered>
        <CardTitle>Standard & Zebra</CardTitle>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
        <CodeLabel label="table table-zebra" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card bordered>
          <CardTitle>Active Row & Hover</CardTitle>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover">
                  <th>1</th>
                  <td>Hover me</td>
                </tr>
                <tr className="bg-base-200">
                  <th>2</th>
                  <td>Active Row</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Normal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <CodeLabel label="tr.hover" />
            <CodeLabel label="tr.bg-base-200" />
          </div>
        </Card>

        <Card bordered>
          <CardTitle>Compact Table</CardTitle>
          <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows">
              <thead>
                <tr>
                  <th>A</th> <th>B</th> <th>C</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Data</td><td>Data</td><td>Data</td></tr>
                <tr><td>Data</td><td>Data</td><td>Data</td></tr>
                <tr><td>Data</td><td>Data</td><td>Data</td></tr>
                <tr><td>Data</td><td>Data</td><td>Data</td></tr>
                <tr><td>Data</td><td>Data</td><td>Data</td></tr>
              </tbody>
            </table>
          </div>
          <CodeLabel label="table-xs table-pin-rows" />
        </Card>
      </div>
    </section>
